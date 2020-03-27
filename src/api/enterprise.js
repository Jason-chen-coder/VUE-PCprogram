import instance from "../utils/http"
export function EnterpriseListApi({
    name,
    page,
    limit,
    eid,
    username,
    status
}) {
    return instance({
        url: "/enterprise/list",
        method: "GET",
        params: {
            name,
            page,
            limit,
            eid,
            username,
            status
        }
    })
}

export function addEnterpriseApi({
    eid,
    name,
    short_name,
    intro,
    username,
    remark
}) {
    return instance({
        url: "/enterprise/add",
        method: "POST",
        data: {
          eid,
          name,
          short_name,
          intro,
          username,
          remark
        }
    })
}

export function editEnterpriseApi({
    id,
    eid,
    name,
    tag	,
    short_name,
    intro,
    remark
}) {
    return instance({
        url: "/enterprise/edit",
        method: "POST",
        data: {
            id,
            eid,
            name,
            tag	,
            short_name,
            intro,
            remark
        }
    })
}

export function delEnterpriseApi(id){
    return instance({
        url:"/enterprise/remove",
        method:"POST",
        data:{
            id
        }
    })
}

export function setEnterpriseApi(id){
    return instance({
        url:"/enterprise/status",
        method:"POST",
        data:{
            id
        }
    })
}