import "../../styles/ui/SeloStatus.css";

const SeloStatus = ({ status }) => {
  const mapaClasses = {
    Ativo: "status-ativo",
    Afastado: "status-afastado",
    Desligado: "status-desligado",
  };

  const classeStatus = mapaClasses[status] || "status-desligado";

  return (
    <span className={`selo-status-ui ${classeStatus}`}>
      <span className="ponto-status-ui" aria-hidden="true" />
      {status}
    </span>
  );
};

export default SeloStatus;