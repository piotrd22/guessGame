import { User } from "@/types/User";

type Props = {
  user: User;
  index: number;
  key: number;
};

function TableUser({ user, index }: Props) {
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{user.Name}</td>
      <td>{user.Tries}</td>
      <td>{user.NumToGuess}</td>
      <td>{new Date(user.UpdatedAt).toLocaleDateString()}</td>
    </tr>
  );
}

export default TableUser;
