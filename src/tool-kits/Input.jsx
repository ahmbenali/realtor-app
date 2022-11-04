export default function Input({
	type,
	id,
	value,
	placeholder,
	onInputChange,
	className,
	disabled,
	...rest
}) {
	return (
		<input // if no className was passed in, then use the string as default
			className={`w-full px-4  py-2 text-lg text-gray-700 bg-white   border 
					 border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 
					 focus:bg-white focus:border-slate-600 mb-6 ${className}`}
			type={type}
			id={id}
			value={value}
			disabled={disabled}
			placeholder={placeholder}
			onChange={onInputChange}
			{...rest}
		/>
	);
}
