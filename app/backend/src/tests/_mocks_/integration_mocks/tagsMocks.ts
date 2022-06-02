export const mockedAllTags = [
{
    "id": "1",
    "name": "São Paulo",
    "color": "#000"
},
{
    "id": "2",
    "name": "Sorocaba",
    "color": "#fff"
},
{
    "id": "3",
    "name": "Rio de Janeiro",
    "color": "#303030"
},
{
    "id": "4",
    "name": "Angra",
    "color": "#313131"
},
{
    "id": "5",
    "name": "Minas Gerais",
    "color": "#414141"
},
{
    "id": "6",
    "name": "Belo Horizonte",
    "color": "#515151"
}
];

export const mockedCreatedTag = {
id: 1,
name: "São Paulo",
color: "#000",
updatedAt: '2022-06-01T18:20:33.829Z',
createdAt: '2022-06-01T18:20:33.829Z'
}

export const mockedNewTagControllerResponse = { createdId: 1 };

export const error_missing_field = { error: 'New tag must have filled keys: "name" and "color"' };
export const error_typeof_field = { error: 'Fields "name" and "color" must be a string' };