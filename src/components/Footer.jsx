const Footer = () => {
  return (
    <div className='bg-slate-700 text-white fixed bottom-0 w-full px-6 py-3'>
      <div className='flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0'>

        {/* Left Side Privacy, Terms, Contact */}
        <div className="flex flex-col sm:items-start items-center text-sm text-gray-300 text-center sm:text-left">
          <div className="flex gap-4 mb-1">
            <a href="/privacy" className="hover:text-green-600">Privacy</a>
            <a href="/terms" className="hover:text-green-600">Terms</a>
            <a href="/contact" className="hover:text-green-600">Contact</a>
          </div>
          <div>© 2025 Soumitra. All rights reserved.</div>
        </div>

        {/* Center Logo and "Created with love by Soumitra" */}
        <div className='flex flex-col items-center text-white font-bold text-center'>
          <div className="logo text-xl sm:text-2xl">
            <span className='text-green-700'>&lt;</span>
            Pass
            <span className='text-green-700'>OP/&gt;</span>
          </div>
          <div className='flex items-center text-xs sm:text-sm mt-1'>
            Created with
            <img className='w-4 mx-1' src="icons/heart.png" alt="heart" />
            by Soumitra
          </div>
        </div>

        {/* Right Side Social Media Icons */}
        <div className="flex gap-4 sm:gap-5 items-center justify-center">
          <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" className="hover:text-green-600">
            <img src="icons/twitter.svg" alt="Twitter" className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a href="https://linkedin.com/in/yourhandle" target="_blank" rel="noopener noreferrer" className="hover:text-green-600">
            <img src="icons/linkedin.svg" alt="LinkedIn" className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a href="https://github.com/yourhandle" target="_blank" rel="noopener noreferrer" className="hover:text-green-600">
            <img src="icons/github2.svg" alt="GitHub" className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a href="https://instagram.com/yourhandle" target="_blank" rel="noopener noreferrer" className="hover:text-green-600">
            <img src="icons/instagram.svg" alt="Instagram" className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </div>

      </div>
    </div>
  )
}

export default Footer
