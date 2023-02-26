import TableUser from "@/components/TableUser";
import MainLayout from "@/layouts/MainLayout";
import { User } from "@/types/User";
import axios from "axios";
import Head from "next/head";

export async function getServerSideProps() {
  const res = await axios.get("http://localhost:5000/hall-of-fame");
  return {
    props: {
      users: res.data.hallOfFame,
    },
  };
}

type Props = {
  users: User[];
};

function HallOfFame({ users }: Props) {
  const userComponent = users?.map((user: User, index: number) => (
    <TableUser user={user} index={index} key={user.ID} />
  ));

  return (
    <>
      <Head>
        <title>NGUESER</title>
      </Head>
      <MainLayout>
        <div className="overflow-x-auto mx-auto w-screen">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Tries</th>
                <th>Number To Guess</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>{userComponent}</tbody>
            <tfoot>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Tries</th>
                <th>Number To Guess</th>
                <th>Date</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </MainLayout>
    </>
  );
}

export default HallOfFame;
