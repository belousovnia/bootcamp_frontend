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
  professionId?: string;
  search?: string;
  complexityId?: string;
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

  const handleProfessionChange = (event: SelectChangeEvent<string>) => {
    console.log(event.target.value);
    onChange({ ...options, professionId: event.target.value });
  };

  const handleComplexityChange = (event: SelectChangeEvent<string>) => {
    console.log(event.target.value);
    onChange({ ...options, complexityId: event.target.value });
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
              <InputLabel id="course-profession">Профессия</InputLabel>
              <Select
                labelId="course-profession"
                id="course-profession"
                label="Профессия"
                defaultValue=""
                value={options.professionId}
                onChange={handleProfessionChange}
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
              <InputLabel id="course-complexity">Сложность</InputLabel>
              <Select
                labelId="course-complexity"
                id="course-complexity"
                label="Сложность"
                defaultValue=""
                value={options.complexityId}
                onChange={handleComplexityChange}
              >
                <MenuItem value="">
                  <em>Не выбрано</em>
                </MenuItem>
                <MenuItem value={10}>Для новичков</MenuItem>
                <MenuItem value={20}>Для опытных</MenuItem>
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
