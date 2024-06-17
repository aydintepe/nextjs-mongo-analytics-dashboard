import numeral from "numeral";
import styles from "./TotalCounter.module.css";

export interface TotalCounterProps {
  name: string;
  totalValue?: number;
  valueFormat?: string;
  valuePrefix?: string;
}

export default function TotalCounter({
  name,
  totalValue = 0,
  valueFormat = "0,0.[000]a",
  valuePrefix = "",
}: TotalCounterProps) {
  return (
    <div className={styles.row}>
      <div className={styles.column}>
        <h2 className={styles.title}>{name}</h2>
        <h3 className={styles.bold} data-testid="TotalCounter_value">
          {numeral(totalValue).format(`${valuePrefix}${valueFormat}`)}
        </h3>
      </div>
    </div>
  );
}
