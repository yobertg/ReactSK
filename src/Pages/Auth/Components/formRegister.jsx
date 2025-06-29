import Button from './button'; // Sesuaikan path
import Input from './input'; // Sesuaikan path
import Label from './label'; // Sesuaikan path

const FormRegister = ({ onSubmit, form, handleChange }) => {
  return (
    <form id="loginform" onSubmit={onSubmit} className="space-y-4">
        <div>
        <Label
          forLabel="name"
          classname="block text-sm font-medium text-gray-700"
          tulisanLabel="Nama Anda"
        />
        <Input
          type="name"
          name="name"
          placeholder="Masukkan nama Kamu"
          value={form.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label
          forLabel="email"
          classname="block text-sm font-medium text-gray-700"
          tulisanLabel="Email"
        />
        <Input
          type="email"
          name="email"
          placeholder="Masukkan email Kamu"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label
          forLabel="password"
          classname="block text-sm font-medium text-gray-700"
          tulisanLabel="Password"
        />
        <Input
          type="password"
          name="password"
          placeholder="Masukkan Password Kamu"
          value={form.password}
           onChange={handleChange}
        />
      </div>
      
      <Button type="submit" tulisanButton="Register" />
    </form>
  );
};

export default FormRegister;