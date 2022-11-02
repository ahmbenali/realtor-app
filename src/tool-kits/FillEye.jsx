import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

// Note: because both props  onEyeIconClick and showPassword are
// in SignIn and SignUp components defined
// --> No single source of truth for states exists 
// --> solution: Passing states over either lifting up or context api or redux

// component used to show and hide password via clicking the eye icon
function FillEye({ onEyeIconClick, showPassword }) {
	const eyeClass = `absolute right-3 top-3 text-xl cursor-pointer`;
	if (showPassword) {
		return <AiFillEyeInvisible className={eyeClass} onClick={onEyeIconClick} />;
	} else {
		return <AiFillEye className={eyeClass} onClick={onEyeIconClick} />;
	}
}

export default FillEye;
