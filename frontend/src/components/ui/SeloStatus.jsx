import "../../styles/ui/SeloStatus.css";

const SeloStatus = ({ status }) => {
  const textoStatus = status === "Desligado" ? "Inativo" : status;
  const classeCor = textoStatus.toLowerCase(); // "ativo", "afastado" ou "inativo"

  return (
    <span className={`selo-status selo-status-${classeCor}`}>
      <span className="selo-status-bolinha" aria-hidden="true" />
      {textoStatus}
    </span>
  );
};

export default SeloStatus;