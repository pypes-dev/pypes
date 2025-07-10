package common

type CreateResponse[T any] struct {
	Body struct {
		RecordsCreated int `json:"records_created" example:"1" doc:"The number of records created"`
		Record         T   `json:"record" doc:"The newly created record"`
	}
}

type UpdateResponse[T any] struct {
	Body struct {
		RecordsUpdated int `json:"records_updated" example:"1" doc:"The number of records updated"`
		Record         T   `json:"record" doc:"The newly updated record"`
	}
}

type ReadResponse[T any] struct {
	Body struct {
		RecordsCount int `json:"records_count" example:"1900" doc:"The number of records retrieved from the response"`
		Offset       int `json:"offset" example:"400" doc:"The number of records offset from the initial record paginating from i.e 5th page on pages of 100 is offset 400"`
		Limit        int `json:"limit" example:"100" doc:"The number of records limited to this response, ie the 5th page on pages of 100 is limit of 100"`
		Records      []T `json:"records" doc:"The objects returned from the GET read in an array"`
	}
}
