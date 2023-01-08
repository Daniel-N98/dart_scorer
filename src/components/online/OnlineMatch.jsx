import CreateOnlineMatch from "./CreateOnlineMatch";
import JoinOnlineMatch from "./JoinOnlineMatch";

export default function OnlineMatch() {
  return (
    <section id="online-match">
      <h1>Online games</h1>
      <CreateOnlineMatch />
      <JoinOnlineMatch />
    </section>
  );
}
