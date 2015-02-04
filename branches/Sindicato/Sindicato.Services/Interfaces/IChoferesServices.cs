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
    public interface IChoforesServices
    {
        IEnumerable<SD_CHOFERES> ObtenerChoferesPaginados(PagingInfo paginacion, FiltrosModel<ChoferesModel> filtros);

        RespuestaSP GuardarChofer(SD_CHOFERES chofer, int ID_USR);

        IEnumerable<SD_GARANTES> ObtenerGarantesPaginados(PagingInfo paginacion, FiltrosModel<ChoferesModel> filtros);

        RespuestaSP GuardarGarante(SD_GARANTES garante, string login);

        //SD_USUARIOS
    }
}
