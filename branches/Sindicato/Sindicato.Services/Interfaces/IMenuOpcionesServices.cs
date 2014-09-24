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
    public interface IMenuOpcionesServices
    {
        IEnumerable<SD_MENU_OPCIONES> ObtenerMenuOpciones(Expression<Func<SD_MENU_OPCIONES, bool>> criterio);
        IEnumerable<V_TABLAS_COLUMNAS> ObtenerCamposTabla(Expression<Func<V_TABLAS_COLUMNAS, bool>> criterio);
    }
}
