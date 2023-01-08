export default function CreateOnlineMatch() {
  const handleClick = async (e) => {
    e.preventDefault();
    document.location.href = `/games/online/setup`;
  };

  return (
    <section id="create-online-match">
      <button onClick={(e) => handleClick(e)}>Create match</button>
    </section>
  );
}
