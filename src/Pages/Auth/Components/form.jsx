import Button from './button'; // Sesuaikan path
import Input from './input'; // Sesuaikan path
import Label from './label'; // Sesuaikan path

const Form = ({ onSubmit, email, setEmail, password, setPassword }) => {
  return (
    <form id="loginform" onSubmit={onSubmit} className="space-y-4">
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex justify-between items-center">
        <label htmlFor="remember" className="flex items-center">
          <input type="checkbox" className="mr-2" id="remember" />
          <span className="text-sm text-gray-700">Ingat saya</span>
        </label>
        <a href="#" className="text-sm text-blue-500 hover:underline">
          Lupa Password
        </a>
      </div>
      <Button type="submit" tulisanButton="Login" />
    </form>
  );
};

export default Form;