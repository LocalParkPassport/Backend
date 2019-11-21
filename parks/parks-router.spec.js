const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig')

// beforeAll(async () => {
//     await db('parks').truncate();
// })

const input = {
    name: "new park",
    description: "lots of trees",
    location: "lagos",
    restrooms: true,
    fishing: false,
    camping: false,
    tennis: true,
    basketball: false,
    golf: false,
    dogPark: true,
    img: 'img',
    user_id: 1
}

describe('parks router', () => {
    // describe('POST /parks', () => {
    //     test('should return 201, park added', () => {
    //         return request(server)
    //             .post('/api/parks')
    //             .send(input)
    //             .set(`Authorization = eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9EUkdRVU16TlRJNU1VWXhPVVU0UkVNd1JUUTBORGxCT1VJMU5EVkdNRUl3UlRReE16QTFOdyJ9.eyJpc3MiOiJodHRwczovL2Rldi00aGR1eGpzci5hdXRoMC5jb20vIiwic3ViIjoiSVlHWHQ3SXRJcEVFVEVTY0FYSXhmWkJESTNMcU81OE5AY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LTRoZHV4anNyLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNTc0MzAxMTY0LCJleHAiOjE1NzQzODc1NjQsImF6cCI6IklZR1h0N0l0SXBFRVRFU2NBWEl4ZlpCREkzTHFPNThOIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6aG9va3MgdXBkYXRlOmhvb2tzIGRlbGV0ZTpob29rcyBjcmVhdGU6aG9va3MgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIHJlYWQ6bG9nX3N0cmVhbXMgY3JlYXRlOmxvZ19zdHJlYW1zIGRlbGV0ZTpsb2dfc3RyZWFtcyB1cGRhdGU6bG9nX3N0cmVhbXMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.Ij1uFUO7hXkZRT3G5iLOkduF8TjEDmFJnD0EDWwbge9-QGHQuD7AzFXN54xJ_K4enPSKuAxyTzS5PoAAfHpHTcbyXimzcqO4wnqz2ESGVoVVFL5YeSc70dp-8F4qra-cQBQsP3NpEctleNCcZ17-Mci7BFOrtuof41ioy818u8pQxtkYwCtbSPT-B96i26vf9r8WDTE-ehnA8MgbsxKAdYXdp_vJCbcSa2k59DzEGflQNxozFwpv41HzhRPqQcoTUXu9eoYemY3Lzx1cg9NxFn3FpVipvdnBSLiKv2ywQ7cXOE63WtJd97c2S0ZDRo9UcgNkvxEcTJxohi9cys5mYg
    //             `)
    //             .set('Accept', 'application/json')
    //             .expect('Content-Type', /json/)
    //             .expect(201)
    //             .then(res => {
    //                 (res.body)
    //             })
    //     });
    // });
    
    describe('GET /parks', () => {
        test('should return 201, with testing as user and correct content-type', () => {
            return request(server)
                .get('/api/parks')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    (res.body)
                })
        });
    });

    

})