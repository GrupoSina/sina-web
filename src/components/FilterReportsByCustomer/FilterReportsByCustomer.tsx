import { useProjectContext } from "@/context/ProjectContext";
import { useReportContext } from "@/context/ReportContext";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { MdCancel } from "react-icons/md";
import { SlArrowDown } from "react-icons/sl";

export default function FilterReportsByCustomer() {
  const {
    customers,
    page,
    rowsPerPage,
    fetchReportsByCustomerId,
    fetchReports,
    setSelectedCustomer,
    loading
  } = useReportContext();
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const selectedId = Array.from(selectedKeys)[0];
    if (selectedId) {
      fetchReportsByCustomerId(selectedId, page, rowsPerPage);
      setSelectedCustomer(selectedId);
      return;
    }
    setSelectedCustomer(undefined);
    fetchReports(1, 4);
  }, [selectedKeys]);

  const selectedValue = useMemo(() => {
    if (selectedKeys.size > 0) {
      const selectedId = Array.from(selectedKeys)[0];
      const selectedCustomer = customers.find((item) => item.id === selectedId);
      return selectedCustomer?.corporateName || "Cliente";
    }
    return "Cliente";
  }, [selectedKeys, customers]);

  const handleSelectionChange = (keys: "all" | Set<React.Key>) => {
    console.log(keys);
    setSelectedKeys(new Set(Array.from(keys) as string[]));
  };

  const handleClearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedKeys(new Set());
  };

  return (
    <div className="flex gap-3 items-center">
      <h1 className="text-nowrap font-medium">Filtrar por </h1>
      <Dropdown backdrop="blur" isDisabled={loading}>
        <DropdownTrigger>
          <Button
            className="bg-white text-[16px] font-medium"
            endContent={<SlArrowDown />}
          >
            {selectedValue}
          </Button>
        </DropdownTrigger>

        <DropdownMenu
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={handleSelectionChange}
          
          variant="light"
          aria-label="Static Actions"
          className="max-h-[320px] overflow-auto scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-700"
        >
          {customers.map((item) => (
            <DropdownItem key={item.id} className="text-black">
              {item.corporateName}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      {selectedValue !== "Cliente" && !loading &&  (
        <MdCancel
          className="cursor-pointer ml-[-8px]"
          size={22}
          onClick={handleClearSelection}
        />
      )}
    </div>
  );
}