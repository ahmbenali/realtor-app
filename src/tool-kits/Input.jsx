export default function Input(props) {
	const { type, id, value, placeholder, onFormChange, className } = props;

	return (
		<input // if no className was passed in, then use the string as default
			className={
				className ??
				`w-full px-4 py-2 text-xl text-gray-700 mb-6
							bg-white border-gray-300 rounded transition ease-in-out`
			}
			type={type}
			id={id}
			value={value}
			placeholder={placeholder}
			onChange={onFormChange}
		/>
	);
}
