import MainLayout from "@/layouts/MainLayout";
import axios from "axios";

export async function getServerSideProps() {
  const res = await axios.get("http://localhost:5000/hall-of-fame");
  return {
    props: {
      users: res.data.hallOfFame,
    },
  };
}

interface User {
  ID: number;
  Name: string;
  Tries: number;
  NumToGuess: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  IsGuessed: boolean;
}

type Props = {
  users: User[];
};

function HallOfFame({ users }: Props) {
  const userComponent = users?.map((user: User) => (
    <p className="text-3xl font-bold underline" key={user.ID}>
      {user.Name}
    </p>
  ));

  return (
    <MainLayout>
      <div>{userComponent}</div>
    </MainLayout>
  );
}

export default HallOfFame;
