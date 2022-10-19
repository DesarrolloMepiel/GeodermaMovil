import { goScanner } from "./Camera";
import "./styles.css";

const Counting = (props) => {
  const { products } = props;
  return (
    <>
      <h2>Conteo</h2>
      {/* <table data-toggle="table" data-search="true" data-show-columns="true">
        <thead>
          <tr className="tr-class-1">
            <th data-field="name" rowSpan="2" data-valign="middle">
              Name
            </th>
            <th colSpan="2">Detail</th>
          </tr>
          <tr className="tr-class-2">
            <th data-field="star">Stars</th>
            <th data-field="forks">Forks</th>
            <th data-field="description">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr
            id="tr-id-1"
            className="tr-class-1"
            data-title="bootstrap table"
            data-object='{"key": "value"}'
          >
            <td
              id="td-id-1"
              className="td-class-1"
              data-title="bootstrap table"
            >
              <a
                href="https://github.com/wenzhixin/bootstrap-table"
                target="_blank"
              >
                bootstrap-table
              </a>
            </td>
            <td data-value="526">8827</td>
            <td data-text="122">3603</td>
            <td data-i18n="Description">
              An extended Bootstrap table with radio, checkbox, sort,
              pagination, and other added features. (supports twitter bootstrap
              v2 and v3)
            </td>
          </tr>
        </tbody>
      </table> */}
    </>
  );
};

export default Counting;
