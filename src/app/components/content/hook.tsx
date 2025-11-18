// useNoScroll.js
import { useEffect } from 'react'

const useNoScroll = (isActive: boolean) => {
	useEffect(() => {
		if (isActive) {
			document.body.classList.add('no-scroll')
		} else {
			document.body.classList.remove('no-scroll')
		}

		// Cleanup function runs when component unmounts or isActive changes
		return () => {
			document.body.classList.remove('no-scroll')
		}
	}, [isActive]) // Re-run effect if isActive changes
}

export default useNoScroll
