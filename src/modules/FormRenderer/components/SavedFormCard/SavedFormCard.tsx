import { useNavigate } from "react-router-dom";
import { FormBuilderData } from "../../../../types/formbuider_types";
import { formatDate } from "../../../../utils/date_utils";
import styles from "./SavedFormCard.module.scss";

interface SavedFormCardProps {
  formBuilderData: FormBuilderData;
}

function SavedFormCard({ formBuilderData }: SavedFormCardProps) {
  const navigate = useNavigate();
  return (
    <div
      className={styles.SavedFormCard}
      key={formBuilderData.id}
      onClick={() => {
        navigate(`/view/${formBuilderData.id}`);
      }}
    >
      <div className={styles.Top}>
        {formBuilderData.metadata.name}
        <span className={styles.FieldsCount}>
          {formBuilderData?.components?.length} fields
        </span>
      </div>
      <div className={styles.LastUpdated}>
        Last updated: {formatDate(formBuilderData.lastUpdated as string)}
      </div>
    </div>
  );
}

export default SavedFormCard;
