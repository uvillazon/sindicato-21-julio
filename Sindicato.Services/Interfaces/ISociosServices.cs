using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sindicato.Common;
using Sindicato.Model;
using Sindicato.Services.Model;
using System.Linq.Expressions;

namespace Sindicato.Services.Interfaces
{
    public interface ISociosServices
    {
        IEnumerable<SD_SOCIO_MOVILES> ObtenerSociosMoviles(Expression<Func<SD_SOCIO_MOVILES, bool>> criterio = null);
        IEnumerable<SD_SOCIOS> ObtenerSoloSociosPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);
        IEnumerable<SD_SOCIO_MOVILES> ObtenerSociosPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);
        IEnumerable<SD_DOCUMENTACIONES> ObtenerSocioDocumentacionesPaginado(PagingInfo paginacion);
        IEnumerable<SD_SOCIO_DESEMPENOS> ObtenerSocioDesempenosPaginado(PagingInfo paginacion);
        IEnumerable<SD_ANTECEDENTES> ObtenerSocioAntecedentesPaginado(PagingInfo paginacion);
        IEnumerable<SD_AUTOS> ObtenerAutosPaginado(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);

        SD_SOCIOS ObtenerSocioPorCriterio(Expression<Func<SD_SOCIOS, bool>> criterio);
        SD_SOCIO_MOVILES ObtenerSocioMovilPorCriterio(Expression<Func<SD_SOCIO_MOVILES, bool>> criterio);

        RespuestaSP GuardarSocio(SD_SOCIOS socio, int ID_USR);
        RespuestaSP GuardarSocioDocumento(SD_DOCUMENTACIONES doc, int ID_USR);
        RespuestaSP GuardarSocioDesempeno(SD_SOCIO_DESEMPENOS des, int ID_USR);
        RespuestaSP GuardarSocioAntecedente(SD_ANTECEDENTES ant, int ID_USR);
        RespuestaSP GuardarSocioMovil(SD_SOCIO_MOVILES socio, int ID_USR);
        RespuestaSP GuardarAutos(SD_AUTOS auto, int ID_USR);
        //SD_USUARIOS
        IEnumerable<SD_OBLIGACIONES_SOCIO> ObtenerObligaciones(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);
        IEnumerable<SD_KARDEX_OBLIGACION> ObtenerKardexObligaciones(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);
        RespuestaSP GuardarObligacion(SD_KARDEX_OBLIGACION kardex, int ID_SOCIO, string login);
    }
}
