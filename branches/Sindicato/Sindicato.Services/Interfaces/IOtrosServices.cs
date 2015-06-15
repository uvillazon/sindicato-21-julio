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
    public interface IOtrosServices
    {

        IEnumerable<SD_ANTECEDENTES> ObtenerAntecedentesPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);
        IEnumerable<SD_DOCUMENTACIONES> ObtenerDocumentacionesPaginado(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);
        IEnumerable<SD_SOCIO_DESEMPENOS> ObtenerDesempenosPaginado(PagingInfo paginacion, FiltrosModel<SociosModel> filtros);


        RespuestaSP GuardarAntecedente(SD_ANTECEDENTES ant, string login);
        RespuestaSP GuardarDocumentacion(SD_DOCUMENTACIONES doc, string login);
        RespuestaSP GuardarDesempeno(SD_SOCIO_DESEMPENOS des, string login);

        RespuestaSP EliminarAntecedente(int ID_ANTECEDENTE);
        RespuestaSP EliminarDocumentaciones(int ID_DOCUMENTACION);
        RespuestaSP EliminarDesempeno(int ID_DESEMPENO);

        SD_ANTECEDENTES ObtenerAntecedentePorCriterio(Expression<Func<SD_ANTECEDENTES, bool>> criterio);
        SD_DOCUMENTACIONES ObtenerDocumentoPorCriterio(Expression<Func<SD_DOCUMENTACIONES, bool>> criterio);
        SD_SOCIO_DESEMPENOS ObtenerDesempenoPorCriterio(Expression<Func<SD_SOCIO_DESEMPENOS, bool>> criterio);
        //SD_FAMILIARES ObtenerFamiliarPorCriterio(Expression<Func<SD_FAMILIARES, bool>> criterio);
        //SD_USUARIOS
    }
}
