import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileMatches } from "../store/matches";

const YourMatches = () => {
  const { matches } = useSelector((state) => state);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileMatches(auth.id));
  }, []);

  return (
    <div>
      {console.log("YOUR MATCHES", matches)}
      {matches[0] ? (
        matches.map((match) => <p key={match.id}>{match.match?.user2.name}</p>)
      ) : (
        <p>No matches at this moment. Try to send a spark to someone!</p>
      )}
    </div>
  );
};

export default YourMatches;
