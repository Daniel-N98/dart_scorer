import { gameExistsWithCode } from "../firebase.js";

export default function JoinOnlineMatch() {
  const handleClick = async (e) => {
    e.preventDefault();
    const formElements = document.getElementById("join-code-form").elements;
    const code = formElements[0].value;
    const gameExists = await gameExistsWithCode(code);

    console.log(`Game exists: ${gameExists}`);
  };

  return (
    <section id="join-online-match">
      <form id="join-code-form">
        <label htmlFor="join-code-input" />
        <input type="text"></input>
        <input type="submit" value="Join" onClick={(e) => handleClick(e)} />
      </form>
    </section>
  );
}
