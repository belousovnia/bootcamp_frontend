import { CoursesSortBy } from '@features/courses/courses.service';
import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';

export type FilterOptions = {
  directionId?: string;
  search?: string;
  tagId?: string;
  sortBy?: CoursesSortBy;
};

interface CourseFilterProps {
  options: FilterOptions;
  onChange: (filterOptions: FilterOptions) => void;
}

export const CoursesFilter = ({ options, onChange }: CourseFilterProps) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...options, search: event.target.value });
  };

  const handleDirectionChange = (event: SelectChangeEvent<string>) => {
    console.log(event.target.value);
    onChange({ ...options, directionId: event.target.value });
  };

  const handleTagChange = (event: SelectChangeEvent<string>) => {
    console.log(event.target.value);
    onChange({ ...options, tagId: event.target.value });
  };

  const handleSortbyChange = (event: SelectChangeEvent<string>) => {
    console.log(event.target.value);
    onChange({ ...options, sortBy: event.target.value as CoursesSortBy });
  };

  return (
    <Card>
      <CardHeader title="Фильтры" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} lg={3}>
            <TextField
              variant="outlined"
              label="Поиск по названию курса"
              onChange={handleSearchChange}
              value={options.search}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4} lg={3}>
            <FormControl fullWidth>
              <InputLabel id="course-direction">Направление</InputLabel>
              <Select
                labelId="course-direction"
                id="course-direction"
                label="Направление"
                defaultValue=""
                value={options.directionId}
                onChange={handleDirectionChange}
              >
                <MenuItem value="">
                  <em>Не выбрано</em>
                </MenuItem>
                <MenuItem value={10}>Программирование</MenuItem>
                <MenuItem value={20}>Аналитика</MenuItem>
                <MenuItem value={30}>Веб-дизайн</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4} lg={3}>
            <FormControl fullWidth>
              <InputLabel id="course-tag">Метки</InputLabel>
              <Select
                labelId="course-tag"
                id="course-tag"
                label="Теги"
                defaultValue=""
                value={options.tagId}
                onChange={handleTagChange}
              >
                <MenuItem value="">
                  <em>Не выбрано</em>
                </MenuItem>
                <MenuItem value={10}>Python</MenuItem>
                <MenuItem value={20}>Java</MenuItem>
                <MenuItem value={30}>Photoshop</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4} lg={3}>
            <FormControl fullWidth>
              <InputLabel id="course-sortby">Сортировать по:</InputLabel>
              <Select
                labelId="course-sortby"
                id="course-sortby"
                label="Сортировать по:"
                value={options.sortBy}
                onChange={handleSortbyChange}
                defaultValue="date-start"
              >
                <MenuItem value={'date-start'}>Дате начала</MenuItem>
                <MenuItem value={'date-end'}>Дате окончания</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
