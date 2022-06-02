export const mockedAllDevices = [
  {
      "id": 1,
      "version": "35001",
      "tags": "1;2",
      "createdAt": "2022-06-01T16:05:07.738Z",
      "updatedAt": "2022-06-01T16:05:07.738Z"
  },
  {
      "id": 2,
      "version": "35001",
      "tags": "3;4",
      "createdAt": "2022-06-01T16:05:07.738Z",
      "updatedAt": "2022-06-01T16:05:07.738Z"
  },
  {
      "id": 3,
      "version": "35001",
      "tags": "5;6",
      "createdAt": "2022-06-01T16:05:07.738Z",
      "updatedAt": "2022-06-01T16:05:07.738Z"
  }
];

export const mockedCreatedDevice = {
    id: 1,
    version: '35001',
    tags: '1;2',
    updatedAt: '2022-06-01T18:20:33.829Z',
    createdAt: '2022-06-01T18:20:33.829Z'
  };

export const mockedNewDeviceControllerResponse = { createdId: 1 };

export const error_missing_field = { error: 'New device must have filled keys: "version" and "tags"' };
export const error_typeof_field = { error: 'Fields "version" and "tags" must be a string' };

export const mockedAllTagsExist = [
  {
    "id": "1",
    "version": "São Paulo",
    "color": "#000"
  },
  {
      "id": "2",
      "version": "Sorocaba",
      "color": "#fff"
  },
]
