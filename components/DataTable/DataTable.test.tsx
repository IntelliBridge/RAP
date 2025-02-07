import { render } from "@testing-library/react";
import DataTable, { Column } from "./DataTable";
import { SearchResult, SearchResults } from "../../utils/ApiUtils";
import { vi, describe, it } from "vitest";

describe("DataTable", () => {
  it("renders w/o crash", () => {
    const goToPageNumber = vi.fn();
    const columns: Column[] = [
      {
        key: "checkbox",
        label: <input type="checkbox" name="selectAll" id="select-all" className="select-all-checkbox" />,
        render: (row: SearchResult) => <div>{row.id}</div>,
      },
      {
        key: "id",
        label: "id",
      },
      {
        key: "id",
      },
    ];

    const content: SearchResult[] = [
      {
        id: "id",
      },
      {
        id: "id",
      },
    ];

    const data: SearchResults = {
      content: content,
      pageable: {
        pageNumber: 10,
        pageSize: 10,
        sort: {
          sorted: true,
          unsorted: true,
          empty: false,
        },
        offset: 2,
        paged: false,
        unpaged: true,
      },
      totalPages: 25,
      totalElements: 2,
      last: false,
      numberOfElements: 3,
      first: false,
      size: 0,
      number: 0,
      sort: {
        sorted: true,
        unsorted: true,
        empty: false,
      },
      empty: false,
    };
    const comp = render(<DataTable data={data} columns={columns} bordered={true} pagination={true} goToPageNumber={goToPageNumber} />);
    expect(comp).toBeDefined();
  });

  it("renders no results", () => {
    const columns: Column[] = [
      {
        key: "id",
      },
    ];

    const content: SearchResult[] = [
      {
        id: "id",
      },
    ];

    const data: SearchResults = {
      content: content,
      pageable: {
        pageNumber: 10,
        pageSize: 10,
        sort: {
          sorted: true,
          unsorted: true,
          empty: false,
        },
        offset: 2,
        paged: false,
        unpaged: true,
      },
      totalPages: 0,
      totalElements: 0,
      last: false,
      numberOfElements: 0,
      first: false,
      size: 0,
      number: 0,
      sort: {
        sorted: true,
        unsorted: true,
        empty: false,
      },
      empty: false,
    };
    const { getByText } = render(<DataTable data={data} columns={columns} />);
    expect(getByText("No results")).toBeInTheDocument();
  });
});
