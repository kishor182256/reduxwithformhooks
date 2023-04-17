import Input from "../components/shared/Input";
import Button from "../components/shared/button";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/userActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRef } from "react";

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    console.log (passwordRef.current , confirmPasswordRef.current)
    await dispatch(registerUser(data))
      .then((response: any) => {
        if (response.payload.token) navigate("/");
        else {
          toast.error("Please enter correct email and password");
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div>
          <Input
            label="Firstname"
            name="firstname"
            register={register}
            required
          />
          {errors.firstname && (
            <span style={{ color: "red" }}>firstname required</span>
          )}

          <Input
            label="Lastname"
            name="lastname"
            register={register}
            required
          />
          {errors.lastname && (
            <span style={{ color: "red" }}>lastname required</span>
          )}

          <Input label="Email" name="email" register={register} required />
          {errors.email && <span style={{ color: "red" }}>Email required</span>}

          <Input
            label="Password"
            name="password"
            register={register}
            required
          />
          {errors.password && (
            <span style={{ color: "red" }}>Password required</span>
          )}

          
        </div>
        <Button>Register</Button>
      </div>
    </form>
  );
};

export default Register;
