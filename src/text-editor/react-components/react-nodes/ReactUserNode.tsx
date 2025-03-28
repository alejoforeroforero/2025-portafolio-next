import { JSX, useState, useEffect } from "react";
import { getUserById } from '../../actions/user-plugin-actions';


interface BaseNode {
  type: string;
  version: 1;
  format: string | number;
  indent?: number;
  direction?: string | null;
  children?: Node[];
}

interface UserNode extends BaseNode {
  type: "user";
  userId: string;
  className?: string;
  style?: string;
}

interface userProps {
  id: string;
  email: string;
  name: string;
  occupation: string | null;
  profile: string;
}

export const ReactUserNode = (node: UserNode): JSX.Element => {
  const [user, setUser] = useState<userProps | null>(null);

  useEffect(() => {
    let isSubscribed = true;

    const fetchUser = async () => {
      try {
        const userData = JSON.parse(node.userId);
        const fetchedUser = await getUserById(userData.id);
        if (isSubscribed) {
          setUser(fetchedUser);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    };

    fetchUser();

    return () => {
      isSubscribed = false;
    };
  }, [node.userId]);

  const classes = node.className || "";

  return (
    <div className={classes}>
      <div>{user?.name || "Loading..."}</div>
    </div>
  );
};
