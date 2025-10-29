import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = "http://localhost:3000/"

const Manager = () => {
    const [form, setForm] = useState({ site: "", username: "", password: "", _id: null })
    const [passwordArray, setPasswordArray] = useState([])
    const [showPassword, setShowPassword] = useState(false);
    const [showAllPasswords, setShowAllPasswords] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const toggleShowAllPasswords = () => {
        setShowAllPasswords(prev => !prev);
    }

    // Fetch all passwords
    const getPasswords = async () => {
        try {
            let req = await fetch(API_URL)
            let passwords = await req.json()

            // Normalize _id to string
            passwords = passwords.map(pwd => ({
                ...pwd,
                _id: pwd._id.toString ? pwd._id.toString() : pwd._id
            }))

            setPasswordArray(passwords)
        } catch (err) {
            toast.error("Failed to fetch passwords")
        }
    }

    useEffect(() => {
        getPasswords()
    }, [])

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
        });
    }

    // Save or update password
    const savePassword = async () => {
        if (form.site.length > 2 && form.username.length > 2 && form.password.length > 2) {
            try {
                const res = await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form)
                })
                const data = await res.json()

                if (data.success) {
                    toast('Password Saved!', { position: "top-right", autoClose: 3000, theme: "dark" })
                    setForm({ site: "", username: "", password: "", _id: null })
                    getPasswords()
                } else {
                    toast.error('Failed to save password')
                }
            } catch (err) {
                toast.error('Failed to save password')
            }
        } else {
            toast.error('Please fill every field with more than 2 characters')
        }
    }

    // Delete password by _id
    const deletePassword = async (id) => {
        if (!window.confirm("Do you really want to delete this password?")) return;

        try {
            const res = await fetch(API_URL, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            })
            const data = await res.json()

            if (data.success) {
                toast('Password deleted!', { position: "top-right", autoClose: 3000, theme: "dark" })
                setPasswordArray(passwordArray.filter(item => item._id !== id))
            } else {
                toast.error('Failed to delete password')
            }
        } catch (err) {
            toast.error('Failed to delete password')
        }
    }

    // Load password details into form for editing
    const editPassword = (id) => {
        const item = passwordArray.find(p => p._id === id)
        if (item) {
            setForm({ ...item })
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer />
            <div className="max-w-screen-md mx-auto px-4 pb-24">
                <h1 className='text-3xl sm:text-4xl font-bold text-center'>
                    <span className='text-green-700'>&lt;</span>
                    Pass
                    <span className='text-green-700'>OP/&gt;</span>
                </h1>

                <p className='text-green-900 dark:text-green-400 text-base sm:text-lg text-center'>
                    Your own Password Manager
                </p>

                {/* Password form */}
                <div className="flex flex-col p-4 text-black dark:text-white gap-6 items-center w-full">
                    <input
                        value={form.site}
                        onChange={handleChange}
                        placeholder='Enter Website URL'
                        className='rounded-full border border-green-500 w-full p-4 py-1 bg-white dark:bg-gray-700 dark:text-white'
                        type="text"
                        name="site"
                        id="site"
                    />

                    <div className="flex flex-col sm:flex-row w-full gap-4">
                        <input
                            value={form.username}
                            onChange={handleChange}
                            placeholder='Enter Username'
                            className='rounded-full border border-green-500 w-full p-4 py-1 bg-white dark:bg-gray-700 dark:text-white'
                            type="text"
                            name="username"
                            id="username"
                        />
                        <div className="relative">
                            <input
                                value={form.password}
                                onChange={handleChange}
                                placeholder='Enter Password'
                                className='rounded-full border border-green-500 w-full p-4 py-1 bg-white dark:bg-gray-700 dark:text-white'
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                            />
                            <span
                                className="absolute right-2 top-2 cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                <img
                                    className='p-1'
                                    width={25}
                                    src={showPassword ? "icons/eye.png" : "icons/eyecross.png"}
                                    alt={showPassword ? "Hide password" : "Show password"}
                                />
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={savePassword}
                        className="flex justify-center items-center gap-2 bg-green-500 hover:bg-green-800 text-sm sm:text-base rounded-full px-6 py-2 w-fit border border-green-900"
                    >
                        Save Password
                    </button>

                    {/* Show all passwords button */}
                    <button
                        onClick={toggleShowAllPasswords}
                        className="flex justify-center items-center gap-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700 text-sm sm:text-base rounded-full px-6 py-2 w-fit border border-gray-400 dark:border-gray-500"
                    >
                        {showAllPasswords ? "Hide All Passwords" : "Show All Passwords"}
                    </button>
                </div>

                {/* Password table */}
                {showAllPasswords && (
                    <div className="passwords mt-6">
                        <h2 className='font-bold text-2xl py-4 text-black dark:text-white'>Your Passwords</h2>
                        {passwordArray.length === 0 ? (
                            <div className='text-black dark:text-white'>No passwords to show</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full table-auto rounded-md overflow-hidden mb-10 text-xs sm:text-sm">
                                    <thead className='bg-green-800 text-white'>
                                        <tr>
                                            <th className="py-2 text-sm sm:text-base">Site</th>
                                            <th className="py-2 text-sm sm:text-base">Username</th>
                                            <th className="py-2 text-sm sm:text-base">Password</th>
                                            <th className="py-2 text-sm sm:text-base">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-green-100 dark:bg-gray-800 text-black dark:text-white'>
                                        {passwordArray.map((item) => (
                                            <tr key={item._id}>
                                                <td className='py-2 border border-white text-center'>
                                                    <div className='flex items-center justify-center'>
                                                        <a href={item.site} target='_blank' rel="noreferrer" className='text-blue-600 dark:text-blue-400'>
                                                            {item.site}
                                                        </a>
                                                        <img
                                                            className='cursor-pointer m-4'
                                                            onClick={() => copyText(item.site)}
                                                            width={16}
                                                            src="icons/copy.png"
                                                            alt="copy site"
                                                        />
                                                    </div>
                                                </td>
                                                <td className='py-2 border border-white text-center'>
                                                    <div className='flex items-center justify-center'>
                                                        {item.username}
                                                        <img
                                                            className='cursor-pointer m-4'
                                                            onClick={() => copyText(item.username)}
                                                            width={16}
                                                            src="icons/copy.png"
                                                            alt="copy username"
                                                        />
                                                    </div>
                                                </td>
                                                <td className='py-2 border border-white text-center'>
                                                    <div className='flex items-center justify-center'>
                                                        {"*".repeat(item.password.length)}
                                                        <img
                                                            className='cursor-pointer m-4'
                                                            onClick={() => copyText(item.password)}
                                                            width={16}
                                                            src="icons/copy.png"
                                                            alt="copy password"
                                                        />
                                                    </div>
                                                </td>
                                                <td className='py-2 border border-white text-center'>
                                                    <div className='flex justify-center gap-4'>
                                                        <button
                                                            onClick={() => editPassword(item._id)}
                                                            className='px-2 rounded-md bg-green-600 text-white'>Edit</button>

                                                        <button
                                                            onClick={() => deletePassword(item._id)}
                                                            className='px-2 rounded-md bg-red-600 text-white'>Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default Manager
