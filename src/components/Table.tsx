"use client";

import { Table } from "@radix-ui/themes";
import { MissingBags } from "../App";

export default function BaggageTable(props: { data: MissingBags[] }) {
  const { data } = props;
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Country</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Total Bags</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Flight Number</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Booking Reference</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((row) => (
          <Table.Row key={row.id}>
            <Table.RowHeaderCell>{row.name}</Table.RowHeaderCell>
            <Table.Cell>{row.country}</Table.Cell>
            <Table.Cell>{row.numberBags}</Table.Cell>
            <Table.Cell>{row.flightNumber}</Table.Cell>
            <Table.Cell>{row.bookingReference}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
