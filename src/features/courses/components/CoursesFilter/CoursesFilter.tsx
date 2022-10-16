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
import debounce from 'lodash.debounce';

export type FilterOptions = {
  professionId?: string;
  search?: string;
  isForAdvancedStudents?: boolean;
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
    onChange({ ...options, professionId: event.target.value });
  };

  const handleIsForAdvancedChange = (event: SelectChangeEvent<string>) => {
    onChange({ ...options, isForAdvancedStudents: event.target.value === 'yes' });
  };

  const handleSortbyChange = (event: SelectChangeEvent<string>) => {
    onChange({ ...options, sortBy: event.target.value as CoursesSortBy });
  };

  return (
    <Card>
      <CardHeader title="Фильтры" sx={{ p: { md: 3 }, pb: { md: 1 } }} />
      <CardContent sx={{ p: { md: 3 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} lg={3}>
            <TextField
              variant="outlined"
              label="Поиск по названию курса"
              onChange={debounce(handleSearchChange, 300)}
              defaultValue={options.search}
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
              <InputLabel id="course-for-advanced">Сложность</InputLabel>
              <Select
                labelId="course-for-advanced"
                id="course-for-advanced"
                label="Сложность"
                value={options.isForAdvancedStudents ? 'yes' : 'no'}
                onChange={handleIsForAdvancedChange}
              >
                <MenuItem value="">
                  <em>Не выбрано</em>
                </MenuItem>
                <MenuItem value={'no'}>Для новичков</MenuItem>
                <MenuItem value={'yes'}>Для опытных</MenuItem>
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
