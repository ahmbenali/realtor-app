export default function Input(props) {
	const { type, id, value, placeholder, onInputChange, className, disabled } = props;

	return (
		<input // if no className was passed in, then use the string as default
			className={` w-full px-4 py-2 text-l text-gray-700 mb-6
							bg-white border-gray-300 rounded transition ease-in-out ${className}`}
			type={type}
			id={id}
			value={value}
			disabled={disabled}
			placeholder={placeholder}
			onChange={onInputChange}
		/>
	);
}
