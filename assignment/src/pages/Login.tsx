import Input from "../components/shared/Input";
import Button from "../components/shared/button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const dispatch = useDispatch<any>();

  const token = useSelector((state: any) => state?.auth?.token?.token);
  const navigate = useNavigate();
  console.log("token", token);

  const onSubmit = async (data: FormData) => {
   
    await dispatch(login(data))
      .then((response: any) => {
        if (response.payload.token) {
          navigate("/welcome");
          localStorage.setItem("token", JSON.stringify(token));
        } else {
          toast.error("Please enter a valid credentials");
        }
      })
      .catch((err: any) => {
        console.log("---->", err);
        toast.error(err);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Input label="email" name="email" register={register} required />
        {errors.email && <span style={{ color: "red" }}>Email required</span>}
        <Input
          label="Password"
          name="password"
          register={register}
          type="password"
          required
        />
        {errors.password && (
          <span style={{ color: "red" }}>Password is required</span>
        )}{" "}
        <Button>Login</Button>
      </div>
    </form>
  );
};

export default Login;
