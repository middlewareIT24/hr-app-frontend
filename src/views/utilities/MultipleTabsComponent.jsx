import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default function MultipleTabsComponent({ componentList }) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box style={{ marginLeft: '1rem' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {componentList.map((element, index) => (
            <Tab key={index} {...a11yProps(index)} label={element.label} />
          ))}
        </Tabs>
      </Box>

      {componentList.map((element, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {element.component}
        </CustomTabPanel>
      ))}
    </div>
  );
}

MultipleTabsComponent.propTypes = {
  componentList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      component: PropTypes.node.isRequired
    })
  ).isRequired
};
