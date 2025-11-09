import { Button, Input, InputGroup } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

export default function FormComponent({ onSearch }) {
  const [textSearch, setTextSearch] = useState("");
  return (
    <div className="bg-blue-50 py-6 px-4">
      <form className="flex flex-col sm:flex-row justify-center items-center gap-3" onSubmit={(e) => {
          e.preventDefault();
          onSearch(textSearch);
        }}>
        <InputGroup className="max-w-md">
          <Input
            placeholder="Search products"
            value={textSearch}
            onChange={(e) => setTextSearch(e.target.value)}
            
          />
        </InputGroup>
        

        <Button
          color="primary"
          size="sm"
          type="submit"
          className="flex! items-center gap-1"
        >
          <FaSearch />
          Search
        </Button>
        <Button
          color="success"
          size="sm"
          type="submit"
          className="flex! items-center gap-1"
        >
          Add
        </Button>
      </form>
    </div>
  );
}
