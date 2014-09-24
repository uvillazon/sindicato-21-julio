using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sindicato.Common;
using Sindicato.Common.Data;
using Sindicato.Model;
using Sindicato.Common.Data.Interfaces;
using System.Data.Objects;

namespace Sindicato.Business
{
    public class SD_SOCIOSManager : Repository<SD_SOCIOS>
    {


        public SD_SOCIOSManager(IUnitOfWork uow) : base(uow) { }


        
    }
}
