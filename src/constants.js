module.exports = {
  __change__:                      'change', // NOTE: reserved for emit('change')

  REQUEST_ASSIGNMENTS:             'REQUEST_ASSIGNMENTS',
  FETCH_ASSIGNMENTS:               'FETCH_ASSIGNMENTS',
  FETCH_ASSIGNMENTS_SUCCESS:       'FETCH_ASSIGNMENTS_SUCCESS',
  FETCH_ASSIGNMENTS_FAIL:          'FETCH_ASSIGNMENTS_FAIL',
  UPDATE_ASSIGNMENT_CACHE:         'UPDATE_ASSIGNMENT_CACHE',
  UPDATE_ASSIGNMENT_CACHE_SUCCESS: 'UPDATE_ASSIGNMENT_CACHE_SUCCESS',
  UPDATE_ASSIGNMENT_CACHE_FAIL:    'UPDATE_ASSIGNMENT_CACHE_FAIL',
  ASSIGNMENTS_SYNCHRONIZED:        'ASSIGNMENTS_SYNCHRONIZED',

  REQUEST_NODES:                   'REQUEST_NODES',
  FETCH_NODES:                     'FETCH_NODES',
  FETCH_NODES_SUCCESS:             'FETCH_NODES_SUCCESS',
  FETCH_NODES_FAIL:                'FETCH_NODES_FAIL',
  UPDATE_NODE_CACHE:               'UPDATE_NODE_CACHE',
  UPDATE_NODE_CACHE_SUCCESS:       'UPDATE_NODE_CACHE_SUCCESS',
  UPDATE_NODE_CACHE_FAIL:          'UPDATE_NODE_CACHE_FAIL',
  NODES_SYNCHRONIZED:              'NODES_SYNCHRONIZED',

  DESTROY_ASSIGNMENT:              'DESTROY_ASSIGNMENT',
  CREATE_ASSIGNMENT_SUCCESS:       'CREATE_ASSIGNMENT_SUCCESS',
  CREATE_NODE_SUCCESS:       'CREATE_NODE_SUCCESS',

  LOAD_NODES:  'LOAD_NODES',
  LOAD_NODES_SUCCESS: 'LOAD_NODES_SUCCESS',
  SELECT_ASSIGNMENT: 'SELECT_ASSIGNMENT',

  TAB_CREATED: 'TAB_CREATED',
  CREATED_NAVIGATION_TARGET: 'CREATED_NAVIGATION_TARGET',
  TAB_UPDATED: "TAB_UPDATED",
  HISTORY_STATE_UPDATED: 'HISTORY_STATE_UPDATED',
  WEB_NAV_COMMITTED: 'WEB_NAV_COMMITTED',
  TAB_CLOSED: 'TAB_CLOSED',
  TAB_REPLACED: 'TAB_REPLACED',
  START_RECORDING: "START_RECORDING",
  START_RECORDING_SUCCESS: "START_RECORDING_SUCCESS",
  START_RECORDING_FAIL: "START_RECORDING_FAIL",
  RESUME_RECORDING: "RESUME_RECORDING",
  RESUME_RECORDING_FAIL: "RESUME_RECORDING_FAIL",
  STOP_RECORDING: "STOP_RECORDING",
  STOP_RECORDING_SUCCESS: "STOP_RECORDING_SUCCESS",
  RANK_NODE_WAYPOINT: "RANK_NODE_WAYPOINT",
  RANK_NODE_NEUTRAL: "RANK_NODE_NEUTRAL",
  REQUEST_TAB_STATE: "REQUEST_TAB_STATE",
  REQUEST_TAB_STATE_RESPONSE: "REQUEST_TAB_STATE_RESPONSE",

  UPDATE_ASSIGNMENT_TITLE: "UPDATE_ASSIGNMENT_TITLE",

  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT"
  // MAP_TITLE_UPDATED: "MAP_TITLE_UPDATED",
  // MAP_SHARED: "ASSIGNMENT_SHARED"
}
