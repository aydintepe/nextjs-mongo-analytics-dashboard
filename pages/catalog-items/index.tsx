import classNames from "classnames";
import styles from './index.module.scss';
import { CatalogItemsTable } from '@/components/CatalogItemsTable/CatalogItemsTable';

export default function Orders() {
  return <div className={styles.container}>
    <CatalogItemsTable className={classNames(styles.table, styles.shrinkable)} />
  </div>;
}
