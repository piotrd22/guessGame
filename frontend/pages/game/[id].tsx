import MainLayout from "@/layouts/MainLayout";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Form = {
  numbertoguess: number;
};

function Game() {
  const router = useRouter();
  const { id } = router.query;

  const notify = (data: string) =>
    toast.success(data, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

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
  } = useForm<Form>();

  const checkNumber = async (data: Form) => {
    const res = await axios.put(`http://localhost:5000/check/${id}`, data);

    return res;
  };

  const handleDelete = async () => {
    const res = await axios.delete(`http://localhost:5000/users/${id}`);

    return res.data;
  };

  const handleDelete2 = async () => {
    const res = await axios.delete(`http://localhost:5000/users`);

    return res.data;
  };

  const onSubmit = (data: Form) => {
    const dataToSubmit = {
      numbertoguess: +data.numbertoguess,
    };

    checkNumber(dataToSubmit)
      .then((res) => {
        if (res.status == 200) {
          notify(res.data.answer);
          router.push("/hall-of-fame");
          handleDelete2();
          reset();
        } else {
          reset();
          notify(res.data.message);
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            console.log(error);
            notifyError(error.response.data.message);
          }
        } else console.log(error);
      });
  };

  return (
    <>
      <Head>
        <title>NGUESER</title>
      </Head>
      <MainLayout>
        <div className="container mx-auto p-5">
          <Link href={"/"} className="btn" onClick={handleDelete}>
            &#8592; Back
          </Link>
          <h1 className="text-center mt-3 mb-3 text-3xl">
            GUESS NUMBER BETWEEN 1-100
          </h1>
          <form
            className="sm:w-full lg:w-1/2 flex flex-col justify-items-center mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="mt-5 mb-2">Number to guess</label>
            <input
              className="input input-bordered w-full"
              type="text"
              {...register("numbertoguess", { required: true })}
            />
            {errors.numbertoguess && (
              <div className="my-2">This field is required!</div>
            )}
            <button className="btn btn-primary my-5 mx-auto flex">CHECK</button>
          </form>
        </div>
      </MainLayout>
    </>
  );
}

export default Game;
