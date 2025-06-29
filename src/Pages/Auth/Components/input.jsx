const Input = ({ type, name, placeholder = '', value, onChange }) => {
    return (
      <input
        type={type}
        name={name}
        id={name} // Menggunakan 'name' sebagai 'id' agar konsisten dengan label
        required
        placeholder={placeholder}
        value={value} // Menambahkan value untuk controlled input
        onChange={onChange} // Menambahkan onChange untuk update state
        className="w-full px-4 py-2 mt-1 border rounded-lg 
                   focus:outline-none focus:ring focus:ring-blue-300"
      />
    );
  };
  
  export default Input;