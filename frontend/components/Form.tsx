import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import { User } from "@/types/User";
import { toast } from "react-toastify";

type Form = {
  name: string;
};

function Form() {
  const router = useRouter();

  const notifyError = (data: string) => {
    toast.error(data, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      name: "",
    },
  });

  const createUser = async (data: Form) => {
    const res = await axios.post(`http://localhost:5000/users`, data);

    return res.data;
  };

  const onSubmit = (data: Form) => {
    createUser(data)
      .then((user: User) => {
        router.push(`game/${user.ID}`);
        reset();
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            notifyError(error.response.data.message);
          }
        } else alert(error);
      });
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-center mt-3 mb-3 text-3xl">START GAME</h1>
      <form
        className="sm:w-full lg:w-1/2 flex flex-col justify-items-center mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="mt-5 mb-2">Name</label>
        <input
          className="input input-bordered w-full"
          type="text"
          {...register("name", { required: true })}
        />
        {errors.name && <div className="my-2">This field is required!</div>}
        <button className="btn btn-primary my-5 mx-auto flex">Start</button>
      </form>
    </div>
  );
}

export default Form;
