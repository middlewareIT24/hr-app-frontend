// assets
import { IconDatabase, IconPalette, IconShadow, IconTypography, IconWindmill } from '@tabler/icons-react';

// constant
const icons = {
    IconDatabase,
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: 'HR App',
    type: 'group',
    children: [
        {
            id: 'util-dataTable',
            title: 'Data Table',
            type: 'item',
            url: '/utils/data-table',
            icon: icons.IconDatabase,
            breadcrumbs: false
        },
        {
            id: 'util-typography',
            title: 'Candidate Evaluation',
            type: 'item',
            url: 'candidate-evaluation',
            icon: icons.IconTypography,
            breadcrumbs: false
        },
        {
            id: 'util-color',
            title: 'Candidate Facilities',
            type: 'item',
            url: 'hr-entry-form',
            icon: icons.IconTypography,
            breadcrumbs: false
        },
        {
            id: 'util-shadow',
            title: 'Shadow',
            type: 'item',
            url: '/utils/util-shadow',
            icon: icons.IconShadow,
            breadcrumbs: false
        }
    ]
};

export default utilities;
