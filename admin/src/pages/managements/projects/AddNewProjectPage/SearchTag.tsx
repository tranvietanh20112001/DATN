import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { API_TAG } from "@config/app.config";
import { ITag } from "@interfaces/tag.interface";

interface SearchTagProps {
  onTagsChange: (tags: ITag[]) => void;
}

const SearchTag: React.FC<SearchTagProps> = ({ onTagsChange }) => {
  const [tags, setTags] = useState<ITag[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: any, newInputValue: string) => {
    setInputValue(newInputValue);
    if (newInputValue) {
      axios
        .get(`${API_TAG}/search-tags?search=${newInputValue}`)
        .then((res) => {
          setTags(res.data);
        });
    }
  };

  const handleTagChange = (event: any, newTags: ITag[]) => {
    onTagsChange(newTags);
  };

  return (
    <Autocomplete
      size="small"
      multiple
      options={tags}
      getOptionLabel={(option) => option.name}
      onInputChange={handleInputChange}
      onChange={handleTagChange}
      renderInput={(params) => <TextField {...params} label="Search Tags" />}
    />
  );
};

export default SearchTag;
