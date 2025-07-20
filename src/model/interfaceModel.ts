export default interface companyInterface {
    "ticker": string,
    "target_from": number,
    "target_to": number,
    "company": string,
    "action": string,
    "brokerage": string,
    "rating_from": string,
    "rating_to": string,
    "time": Date,
}
export default interface companiesCalInterface  {
	"Info":companyInterface,
	"rating_points":number,        
	"action_points":number,        
	"target_points":number,        
	"total_points":number,         
	"target_to_bet_than_from":boolean, 
	"summary":string,             
}

