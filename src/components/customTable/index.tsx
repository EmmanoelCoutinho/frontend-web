import {
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

interface CustomTableProps {
  headItens: { [key: string]: string };
  bodyItens: Array<{ [key: string]: any }>;
  loading?: boolean;
}

function CustomTable({
  headItens,
  bodyItens,
  loading,
}: CustomTableProps) {
  return (
    <>
      {!loading && (
        <TableContainer overflowY="auto">
          <Table size="sm">
            <Thead>
              <Tr>
                {Object.values(headItens).map((item, index) => (
                  <Th key={index}>{item}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {bodyItens?.map((item, rowIndex) => (
                <Tr key={rowIndex}>
                  {Object.keys(headItens).map((key, cellIndex) => {
                    const keys = key.split('.');
                    let value: any = item;
                    keys.forEach((k) => {
                      value = value ? value[k] : '';
                    });
                    return (
                      <Td key={cellIndex} isTruncated whiteSpace="nowrap">
                        {typeof value === 'object' ? value : String(value)}
                      </Td>
                    );
                  })}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      {loading && (
        <span className="flex justify-center items-center w-full h-full">
          <Spinner size="xl" color="#EA580C" />
        </span>
      )}
    </>
  );
}

export default CustomTable;
