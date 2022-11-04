export default function Button({ type, className, children, ...rest }) {
	return (
		<button
			type={type}
			className={`w-full  px-7 py-3 text-sm  uppercase rounded 
				transition duration-150 ease-in-out ${className}`}
			{...rest}
		>
			{children}
		</button>
	);
}
