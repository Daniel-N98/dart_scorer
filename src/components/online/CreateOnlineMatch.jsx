import Button from "react-bootstrap/Button";

export default function CreateOnlineMatch() {
  const handleClick = async (e) => {
    e.preventDefault();
    document.location.href = `/games/online/setup`;
  };

  return (
    <section id="create-online-match">
      <Button variant="dark" onClick={(e) => handleClick(e)}>
        Create match
      </Button>
    </section>
  );
}
