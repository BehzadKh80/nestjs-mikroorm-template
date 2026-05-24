import type { NodePlopAPI } from 'plop';

import addImportAction from './add-import';

const actionTypes: ((plop: NodePlopAPI) => void)[] = [addImportAction];

export default actionTypes;
